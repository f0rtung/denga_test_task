import json
from functools import wraps
from django.shortcuts import HttpResponse

from .response import ErrorResponse


def check_post_method(func):
    @wraps(func)
    def func_wrapper(request, *args, **kwargs):
        if request.method == 'POST':
            return func(request, *args, **kwargs)
        else:
            response = ErrorResponse("Invalid method!")
            return HttpResponse(json.dumps(response.as_dict()))
    return func_wrapper
