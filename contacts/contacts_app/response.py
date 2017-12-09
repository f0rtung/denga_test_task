class BaseResponse:
    def __init__(self, has_error, message):
        self.has_error = has_error
        self.message = message

    def as_dict(self):
        return {
            'has_error': self.has_error,
            'message': self.message
        }


class ErrorResponse(BaseResponse):
    def __init__(self, message):
        super().__init__(True, message)


class SuccessResponse(BaseResponse):
    def __init__(self, message=""):
        super().__init__(False, message)
