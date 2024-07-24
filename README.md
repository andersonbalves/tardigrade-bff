# Tardigrade BFF

## Project Structure

```markdown
📦tardigrade-bff
┣ 📂app
┃ ┣ 📂e2e
┃ ┣ 📂src
┃ ┃ ┣ 📂core
┃ ┃ ┃ ┣ 📂forms
┃ ┃ ┃ ┃ ┣ 📂xpto
┃ ┃ ┃ ┃ ┃ ┣ 📜form.ts
┃ ┃ ┃ ┃ ┃ ┣ 📜payload.json
┃ ┃ ┃ ┃ ┃ ┣ 📜xpto.module.ts
┃ ┃ ┃ ┃ ┃ ┗ 📜xpto.service.ts
┃ ┃ ┃ ┣ 📂model
┃ ┃ ┃ ┃ ┣ 📜field.model.ts
┃ ┃ ┃ ┃ ┣ 📜form.model.ts
┃ ┃ ┃ ┃ ┗ 📜menu.model.ts
┃ ┃ ┃ ┣ 📜form-dynamic.module.ts
┃ ┃ ┃ ┗ 📜form.abstract.service.ts
┃ ┃ ┣ 📂form
┃ ┃ ┃ ┣ 📜form-registry.service.ts
┃ ┃ ┃ ┣ 📜form.controller.ts
┃ ┃ ┃ ┗ 📜form.module.ts
┃ ┃ ┣ 📂handlers
┃ ┃ ┃ ┗ 📜internal-error.filter.ts
┃ ┃ ┣ 📂menu
┃ ┃ ┃ ┣ 📜menu.controller.ts
┃ ┃ ┃ ┣ 📜menu.module.ts
┃ ┃ ┃ ┗ 📜menu.service.ts
┃ ┃ ┣ 📜app.module.ts
┃ ┃ ┗ 📜main.ts
┃ ┗ 📜package.json
┣ 📜LICENSE
┗ 📜README.md
```

### Folders and Files

- `core/`: Contains core services and modules related to form handling.
  - `form.abstract.service.ts`: Abstract form service providing base functionality for forms.
  - `form-dynamic.module.ts`: Dynamic form module, managing dynamic forms functionality.
  - `forms/`: Subdirectory for form-related functionality, including specific form configurations.
    - `xpto/`: Directory for the form definition.
      - `form.ts`: Export a constant with the form definition.
      - `payload.json`: JSON file with the form payload definition containing placeholders for the form send.
      - `xpto.module.ts`: Module definition for the form.
      - `xpto.service.ts`: Extension of the abstract form service for the form.
- `model/`: Intended for data models or interfaces used throughout the application.
- `form/`: Contains form-related controller, module, and services.
  - `form.controller.ts`: Form controller managing HTTP requests related to forms.
  - `form.module.ts`: Module definition for form-related components.
  - `form-registry.service.ts`: Service for managing the registry of forms, dealing with form metadata and instances.
- `handlers/`: Contains handlers for managing various types of application-wide errors or events.
  - `internal-error.filter.ts`: Filter for handling internal errors in the application.
- `menu/`: Contains components related to menu functionality.
  - `menu.controller.ts`: Menu controller managing HTTP requests related to the menu.
  - `menu.module.ts`: Module definition for menu-related components.
  - `menu.service.ts`: Service for managing the menu logic and data.

---

## Requirements

- Node.js (>=20.x.x)
- npm (>=10.x.x)

---

## Installation and Running

1. **Clone the repository**

   ```bash
   git clone https://github.com/andersonbalves/tardigrade-bff.git
   cd tardigrade-bff/app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Running the application**:

   ```bash
   npm run start
   ```

4. **Running tests**:

   - **Unit tests**:

     ```bash
     npm run test
     ```

   - **End-to-end tests**:

     ```bash
     npm run test:e2e
     ```

5. **Mutation tests**:

   ```bash
   npm run stryker
   ```

---

## API Documantation

### Available Endpoints

#### `GET /v1/menu`

- **Description**: Returns the complete menu of the application.
- **Request Example**

  ```bash
  curl -X GET "http://localhost:3000/v1/menu"
  ```

- **Response Example**

  ```json
  [
    {
      "label": "Main Menu",
      "action": [
        {
          "label": "Sub Menu 1",
          "action": "/v1/form/Form1"
        },
        {
          "label": "Sub Menu 2",
          "action": "/v1/form/Form2"
        }
      ]
    }
  ]
  ```

- **Status Codes**
  - `200 OK`: Menu returned successfully.
  - `500 Internal Server Error`: Server error while processing the request.

#### `GET /v1/form/{id}`

- **Description**: Returns the form corresponding to the specified `id`.
- **Parameters**
  - `id` (string): The identifier of the form.
- **Request Example**

  ```bash
  curl -X GET "http://localhost:3000/v1/form/Form1"
  ```

- **Response Example**

  ```json
  {
    "path": "/v1/form/Form1",
    "name": "Form 1",
    "fields": [
      {
        "name": "fieldName1",
        "label": "Field Label 1",
        "type": "text",
        "description": "Description for field 1",
        "required": true
      },
      {
        "name": "fieldName2",
        "label": "Field Label 2",
        "type": "number",
        "description": "Description for field 2",
        "required": false
      }
    ]
  }
  ```

- **Status Codes**
  - `200 OK`: Form returned successfully.
  - `404 Not Found`: Form not found.
  - `500 Internal Server Error`: Server error while processing the request.

#### `POST /v1/form/{id}`

- **Description**: Submits filled form data corresponding to the specified `id`.
- **Parameters**
  - `id` (string): The identifier of the form.
- **Request Example**

  ```bash
  curl -X POST "http://localhost:3000/v1/form/Form1" -H "Content-Type: application/json" -d '{
    "fieldName1": "Sample Text",
    "fieldName2": 123
  }'
  ```

- **Response Example**

<!-- TODO -->

- **Status Codes**
  - `201 Created`: Form data submitted successfully.
  - `400 Bad Request`: Invalid request, missing or incorrect data.
  - `404 Not Found`: Form not found.
  - `500 Internal Server Error`: Server error while processing the request.

## Swagger Documentation

The application provides Swagger documentation for the available endpoints. To access the Swagger UI, navigate to [http://localhost:3000/api](http://localhost:3000/api).

---

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## That's all Folks! 🚀
