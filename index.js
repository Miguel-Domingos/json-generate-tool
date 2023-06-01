const { faker } = require("@faker-js/faker");
const fs = require("fs");
const crypto = require("crypto");

function construct(structure, initialValue = 0) {
  const data = {};

  for (const key in structure) {
    if (typeof structure[key] === "object") {
      if (structure[key].type === "array") {
        data[key] = [];
        const length = structure[key].length || 1;

        for (let item = 0; item < length; item++) {
          data[key].push(construct(structure[key].item, item));
        }
      } else if (structure[key].type === "number") {
        const { min, max, random, values } = structure[key];
        if (values && random) {
          data[key] =
            values[Math.floor(Math.random() * structure[key].values.length)];
        } else if (values) {
          if (initialValue >= values.length) {
            data[key] = values[initialValue - structure[key].values.length];
          } else {
            data[key] = values[initialValue];
          }
        } else if (random) {
          data[key] = faker.number.int({ min, max });
        } else {
          if (initialValue >= max) {
            data[key] = min + initialValue - max;
          } else {
            data[key] = min + initialValue;
          }
        }
      } else {
        if (structure[key].values) {
          const { values, random } = structure[key];
          if (random) {
            data[key] =
              values[Math.floor(Math.random() * structure[key].values.length)];
          } else {
            if (initialValue >= values.length) {
              data[key] = values[initialValue - structure[key].values.length];
            } else {
              data[key] = values[initialValue];
            }
          }
        } else {
          data[key] = construct(structure[key], initialValue);
        }
      }
    } else {
      switch (structure[key]) {
        case "string":
          data[key] = faker.lorem.word();
          break;
        case "number":
          data[key] = faker.number.int();
          break;
        case "uuid":
          const id = crypto.randomUUID();
          data[key] = id;
          break;
        default:
          data[key] = null;
      }
    }
  }

  return data;
}

function jsonConstruct(structure) {
  const data = construct(structure);
  return JSON.stringify(data, null, 2);
}

function main(structure, type) {
  const data = jsonConstruct(structure);

  if (type) {
    let file = "";
    if (type.dir) {
      if (!fs.existsSync(type.dir)) {
        fs.mkdirSync(type.dir);
      }
      file = `${type.dir}/${type.name}.json`;
    } else {
      file = `${type.name}.json`;
    }
    fs.writeFile(file, data, function (err) {
      if (err) throw err;
      console.log(`file ${type.name}.json is created successfully🚀.`);
    });
  } else {
    return data;
  }
}

module.exports = {
  jsonGenerate: main,
};
