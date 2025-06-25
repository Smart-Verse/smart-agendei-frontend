export class SignUp {

    fields: any[] = [
        {
            fieldName: 'name',
            required: true,
            hidden: false,
            type: 'string'
        },
        {
          fieldName: 'phone',
          required: true,
          hidden: false,
          type: 'phone'
        },
        {
            fieldName: 'email',
            required: true,
            hidden: false,
            type: 'email'
        },
        {
            fieldName: 'password',
            required: true,
            hidden: false,
            type: 'password'
        },
        {
            fieldName: 'confirmPassword',
            required: false,
            hidden: false,
            type: 'password'
        }
    ]
}
