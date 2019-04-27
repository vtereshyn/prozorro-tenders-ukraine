const request = require('request');
const Tenders = require('../schema');

const LINK = `http://public.api.openprocurement.org/api/2.4/tenders?offset=${new Date().toISOString()}+02.00`;

const updateData = url =>
  request(url, { json: true }, (error, response, body) => {
    if (error) {
      console.log(error);
    }

    saveDataToDb(body);

    if (body.next_page) {
      const { uri } = body.next_page;
      updateData(uri);
    }
  });

const saveDataToDb = ({ data }) => {
  const tendersList = data.map(({ id, dateModified }) => ({
    id,
    date: dateModified
  }));

  tendersList.forEach(tender => {
    const { id, dateModified } = tender;
    Tenders.update(
      {
        id,
        date: dateModified
      },
      { $set: tender },
      { upsert: true, multi: true },
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  });

  console.log('Data saved to db');
};

updateData(LINK);
