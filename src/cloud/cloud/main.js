Parse.Cloud.define('createTransaction', function(request, response) {
  var transaction = new Parse.Object('Transaction')
  var designation = new Parse.Object('Designation')
  var Envelope = Parse.Object.extend('Envelope')

  var params = request.params

  transaction.set('payee', params.payee)
  transaction.set('amountCents', params.amountCents)
  transaction.setACL(new Parse.ACL(request.user))

  // TODO: split transactions
  designation.set('transaction', transaction)
  designation.set('amountCents', params.amountCents)
  designation.set('envelope', Envelope.createWithoutData(params.envelopeId))
  designation.setACL(new Parse.ACL(request.user))

  Parse.Object.saveAll([transaction, designation]).
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
