define({ "api": [
  {
    "type": "get",
    "url": "account/view/{id}",
    "title": "view account",
    "name": "My_Account",
    "description": "<p>Gets the information of a user based on his Id.</p>",
    "version": "1.0.0",
    "group": "Account",
    "sampleRequest": [
      {
        "url": "https://localhost/docs/api/testaccount/view/1"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "consumer-key",
            "description": "<p>your consumer access token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "consumer-secret",
            "description": "<p>your secret access key.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Represents if the operation went through successfully.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "profile",
            "description": "<p>the user information</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "profile.id",
            "description": "<p>the user Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profile.name",
            "description": "<p>the user's full name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profile.emailAddress",
            "description": "<p>the user's email address.</p>"
          }
        ]
      }
    },
    "filename": "debug/test/controller/1.0.0.cs",
    "groupTitle": "Account",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "maintenance",
            "description": "<p>503 The service is under maintenance.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "account/view/{id}",
    "title": "view account",
    "name": "My_Account",
    "description": "<p>Gets the information of a user based on his Id.</p>",
    "version": "1.0.0",
    "group": "Account",
    "sampleRequest": [
      {
        "url": "https://localhost/docs/api/testaccount/view/1"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "consumer-key",
            "description": "<p>your consumer access token</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "consumer-secret",
            "description": "<p>your secret access key.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Represents if the operation went through successfully.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "profile",
            "description": "<p>the user information</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "profile.id",
            "description": "<p>the user Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profile.name",
            "description": "<p>the user's full name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profile.emailAddress",
            "description": "<p>the user's email address.</p>"
          }
        ]
      }
    },
    "filename": "debug/test/controller/1.0.3.cs",
    "groupTitle": "Account",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "maintenance",
            "description": "<p>503 The service is under maintenance.</p>"
          }
        ]
      }
    }
  }
] });
