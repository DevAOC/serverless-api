'use strict';

const dynamoose = require('dynamoose');

exports.handler = async (event) => {
  let data;
  let status;

  const peopleSchema = new dynamoose.Schema({
    id: Number,
    name: String,
    relation: String,
  });

  try {
    if (event.queryStringParameters.id) {
      data = await peopleSchema.get(event.queryStringParameters.id);
      status = 200;
    } else {
      data = await peopleSchema.scan().exec();
      status = 200;
    }
  } catch (error) {
    data = new Error(error);
    status = 400;
  }
  return {
    status,
    body: JSON.stringify(data),
  };
};
