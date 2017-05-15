import mongoose from 'mongoose';
import version from './mongoose-version/lib/version';

mongoose.connect('mongodb://localhost/local');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('yay!');

  const kittySchema = mongoose.Schema({
    name: String
  });
  kittySchema.plugin(version);

  const Kitten = mongoose.model('Kitten', kittySchema);

  // const kitty = new Kitten({ name: 'Silence' });
  // kitty.save((err, cat) => {
  //   if (err) return console.error(err);
  // });

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);

    const updateAndVersion = kittens[0];
    // updateAndVersion.name += '-1';

    updateAndVersion.save((err, kitten) => {
      if (err) return handleError(err);
    });
    // Kitten.findByIdAndUpdate(updateAndVersion.id, { $set: { name: 'New name2' }}, { new: true }, function (err, kitten) {
    //   if (err) return handleError(err);
    // });
  })

});
