Parse.Cloud.define('createTransaction', function(request, response) {
  var designations = []
  var Envelope = Parse.Object.extend('Envelope')

  var userACL = new Parse.ACL(request.user)

  var params = request.params

  // Validate
  var transactionTotal = params.amountCents
  var designationTotal = params.designations.reduce(function(memo, acc) {
    return memo + acc.amountCents
  }, 0)

  if (transactionTotal !== designationTotal) {
    return response.error("Transaction total does not match designation total. " + transactionTotal + " !== " + designationTotal)
  }

  // Create transaction
  var transaction = new Parse.Object('Transaction')
  transaction.set('payee', params.payee)
  transaction.set('amountCents', params.amountCents)
  transaction.setACL(userACL)

  // Create designations
  params.designations.forEach(function(designationParams) {
    var designation = new Parse.Object('Designation')

    designation.set('transaction', transaction)
    designation.set('amountCents', designationParams.amountCents)
    designation.set('envelope', Envelope.createWithoutData(designationParams.envelopeId))
    designation.setACL(userACL)

    designations.push(designation)
  })

  Parse.Object.saveAll([transaction].concat(designations)).
    then(function() { response.success(transaction) },
         response.error)
});

Parse.Cloud.afterSave('Designation', function(request) {
  var query = new Parse.Query('Envelope')
  query.get(request.object.get('envelope').id).
    then(function(envelope) {
      envelope.increment('amountCents', request.object.get('amountCents'))
      envelope.save()
    })
});
