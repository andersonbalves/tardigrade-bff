# Contributing to Tardigrade BFF

Thank you for your interest in contributing to Tardigrade BFF! This guide will help you understand how to add new forms to the application following the required structure and standards.

## Adding a New Form

To add a new form to the application, follow these steps:

### 1. Create the Form Directory

Create a new directory under `src/core/forms/` for your form. The directory name should be descriptive of the form's purpose.

Example: `src/core/forms/your_form_name/`

### 2. Create Required Files

In the new directory, create the following required files:

1. `form.ts`: Defines the form model.
2. `payload.json`: Contains the payload definition with placeholders for form fields.
3. `<your_form_name>.module.ts`: Defines the NestJS module for the form.
4. `<your_form_name>.service.ts`: Extends the abstract form service and implements the form-specific logic.

#### Example Structure

```markdown
📂src/core/forms/your_form_name/
┣ 📜form.ts
┣ 📜payload.json
┣ 📜your-form-name.module.ts
┗ 📜your-form-name.service.ts
```

### 3. Define the Form Model (form.ts)

Define the form model in `form.ts`. The form model should adhere to the `FormModel` interface.

```typescript
import { FormModel } from "../../model/form.model";

export const form: FormModel = {
  path: "/v1/orchestration/your-form-path",
  name: "Your Form Name",
  fields: [
    {
      name: "fieldName1",
      label: "Field Label 1",
      type: "text",
      description: "Description for field 1",
      required: true,
    },
    {
      name: "fieldName2",
      label: "Field Label 2",
      type: "number",
      description: "Description for field 2",
      required: false,
    },
    // Add more fields as needed
  ],
};
```

### 4. Create the Payload Definition (payload.json)

Create a `payload.json` file with placeholders for the form fields. The placeholders will be replaced with actual values when the form is submitted.

```json
{
  "fieldName1": "{{fieldName1}}",
  "fieldName2": "{{fieldName2}}"
}
```

### 5. Define the Module (your-form-name.module.ts)

Define the NestJS module for the form in `<your_form_name>.module.ts`.

```typescript
import { Module } from "@nestjs/common";
import { YourFormNameService } from "./your-form-name.service";

@Module({
  providers: [YourFormNameService],
  exports: [YourFormNameService],
})
export class YourFormNameModule {}
```

### 6. Implement the Service (your-form-name.service.ts)

Extend the abstract form service and implement the form-specific logic in `<your_form_name>.service.ts`.

```typescript
import { Injectable } from "@nestjs/common";
import { FormService } from "../../form.abstract.service";
import { FormModel } from "../../model/form.model";
import { form } from "./form";

@Injectable()
export class YourFormNameService extends FormService {
  protected _id = "YourFormNameService";
  protected _label = "Your Form Name";
  protected _menuPath = ["Main Menu", "Sub Menu"];
  protected _url = "https://api.example.com/data";
  protected _payloadFile = "payload.json";
  protected _dirname = __dirname;

  async getForm(): Promise<FormModel> {
    return form;
  }
}
```

### 7. Update the Dynamic Form Module

Make sure the new form module is dynamically loaded by the `FormDynamicModule`. This is usually handled automatically if the directory structure and file naming conventions are followed.

### 8. Testing

Run the unit and end-to-end tests to ensure your new form is working correctly:

- **Unit tests**:

  ```bash
  npm run test
  ```

- **End-to-end tests**:

  ```bash
  npm run test:e2e
  ```

### 9. Submit a Pull Request

Once your changes are complete and tested, submit a pull request to the `main` branch. Provide a clear and descriptive title and description of your changes.

---

Thank you for contributing to Tardigrade BFF! Your efforts help make this project better for everyone.
