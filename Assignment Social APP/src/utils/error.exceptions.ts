export interface errorcode {
  code: Number;
}

abstract class AppError extends Error {
  constructor(message: string, options: ErrorOptions, public statusCode: Number) {
    super(message, options);
  }
}

export class notFound extends AppError {
  constructor(message="Not Found" , options:ErrorOptions={} ) {
    super(message,options,404)
  }
}

export class found extends AppError {
  constructor(message="Found" , options:ErrorOptions={} ) {
    super(message,options,200)
  }
}

export class created extends AppError {
  constructor(message="Created" , options:ErrorOptions={} ) {
    super(message,options,201)
  }
}

export class badRequest extends AppError {
  constructor(message="Bad Request" , options:ErrorOptions={} ) {
    super(message,options,400)
  }
}

export class noContent extends AppError {
  constructor(message="No Content" , options:ErrorOptions={} ) {
    super(message,options,401)
  }
}

export class Auth extends AppError {
  constructor(message="Authentication Required" , options:ErrorOptions={} ) {
    super(message,options,407)
  }
}

export class serverError extends AppError {
  constructor(message="Internal Server Error" , options:ErrorOptions={} ) {
    super(message,options,500)
  }
}

export class badGetWay extends AppError {
  constructor(message="Bad Gateway" , options:ErrorOptions={} ) {
    super(message,options,502)
  }
}

export class Timeout extends AppError {
  constructor(message="Gateway Timeout" , options:ErrorOptions={} ) {
    super(message,options,504)
  }
}

