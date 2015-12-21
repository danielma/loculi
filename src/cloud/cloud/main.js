// returns a tuple of valid, message
function validateTransaction(params) {
  var transactionTotal = params.amountCents
  var designationTotal = params.designations.reduce(function(memo, acc) {
    return memo + acc.amountCents
  }, 0)

  if (transactionTotal !== designationTotal) {
    return [false, "Transaction total does not match designation total. " + transactionTotal + " !== " + designationTotal]
  }

  return [true, '']
}

function buildDesignation(params) {
  var Envelope = Parse.Object.extend('Envelope')
  var designation = new Parse.Object('Designation')

  designation.set('transaction', params.transaction)
  designation.set('amountCents', params.amountCents)
  designation.set('envelope', Envelope.createWithoutData(params.envelopeId))
  designation.setACL(params.ACL)

  return designation
}

function buildTransactionAndDesignations(params) {
  // Create transaction
  var transaction = new Parse.Object('Transaction')
  transaction.set('payee', params.payee)
  transaction.set('amountCents', params.amountCents)
  transaction.setACL(params.ACL)

  var Envelope = Parse.Object.extend('Envelope')
  // Create designations
  var designations = []
  params.designations.forEach(function(designationParams) {
    designationParams.transaction = transaction
    designationParams.ACL = params.ACL

    designations.push(buildDesignation(designationParams))
  })

  return {
    transaction: transaction,
    designations: designations
  }
}

Parse.Cloud.define('createTransaction', function(request, response) {
  var params = request.params

  params.ACL = new Parse.ACL(request.user)

  // Validate
  var validation = validateTransaction(params)
  if (validation[0] === false) { return response.error(validation[1]) }

  var transactionAndDesignations = buildTransactionAndDesignations(prams)

  Parse.Object.saveAll([transactionAndDesignations.transaction].concat(transactionAndDesignations.designations)).
    then(response.success,
         response.error)
});

Parse.Cloud.define('createTransfer', function(request, response) {
  var params = request.params
  var fromEnvelopeId = params.fromEnvelopeId

  params.ACL = new Parse.ACL(request.user)

  var transferParams = {
    payee: "Funding",
    amountCents: params.amountCents * -1,
    designations: params.designations.map(function(designation) {
      return {
        envelopeId: fromEnvelopeId,
        amountCents: designation.amountCents * -1,
      }
    }),
  }

  var transactionAndDesignations = buildTransactionAndDesignations(params)
  var transferTransactionAndDesignations = buildTransactionAndDesignations(transferParams)

  var all = [
    transactionAndDesignations.transaction,
    transferTransactionAndDesignations.transaction
  ].concat(transactionAndDesignations.designations).
    concat(transferTransactionAndDesignations.designations)

  Parse.Object.saveAll(all).
    then(response.success, response.error)
})

Parse.Cloud.afterSave('Designation', function(request) {
  var query = new Parse.Query('Envelope')
  query.get(request.object.get('envelope').id).
    then(function(envelope) {
      envelope.increment('amountCents', request.object.get('amountCents'))
      envelope.save()
    })
});
