# Json Generate Tool

A simple and intuitive json generate tool with faker.js to mock data

## How to use

Install the package:

```sh
npm install json-generate-tool
```

Follow the simple example:

```sh
const { jsonGenerate } = require("json-generate-tool");

const structure = {
  comments: {
    type: "array",
    length: 2,
    item: {
      id: "uuid",
      name: "string",
      surname: "string",
      age: {
        type: "number",
        min: 18,
        max: 25,
      },
      evaluation: {
        rating: {
          type: "number",
          values: [0, 2, 4, 6, 8],
          random: true,
        },
        comment: {
          type: "string",
          values: ["I like", "I'ts Good", "Not bad", "Excelent"],
        },
      },
    },
  },
};

console.log(jsonGenerate(structure));

```

output:

```sh
{
  "comments": [
    {
      "id": "2c10ec51-0ffd-49a1-aeea-c3b82f507f98",
      "name": "quam",
      "surname": "odio",
      "age": 18,
      "evaluation": {
        "rating": 4,
        "comment": "I like"
      }
    },
    {
      "id": "63687dee-e41c-426b-9a66-4be52e6978a6",
      "name": "sit",
      "surname": "sunt",
      "age": 19,
      "evaluation": {
        "rating": 8,
        "comment": "I'ts Good"
      }
    }
  ]
}
```
