import json
from datetime import datetime
from django.shortcuts import HttpResponse, render
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist

from .models import ContactsModel
from .decorators import check_post_method
from .response import SuccessResponse, ErrorResponse


def index(request):
    return render(request, 'contacts_app/index.html')


def all_contacts(request):
    contacts = ContactsModel.objects.all()
    contacts_response = [
        {
            'id': contact.id,
            'full_name': " ".join([contact.first_name,
                                   contact.middle_name,
                                   contact.last_name]),
            'email': contact.email,
            'phone': contact.phone,
            'birthday': contact.get_birthday()
        }
        for contact in contacts
    ]
    return HttpResponse(json.dumps(contacts_response))


def contact(request, contact_id):
    try:
        contact = ContactsModel.objects.get(id=contact_id)
        response = {
            'id': contact.id,
            'first_name': contact.first_name,
            'middle_name': contact.middle_name,
            'last_name': contact.last_name,
            'email': contact.email,
            'phone': contact.phone,
            'birthday': contact.get_birthday()
        }
        return HttpResponse(json.dumps(response))
    except Exception as error:
        response = ErrorResponse(str(error))
        return HttpResponse(json.dumps(response.as_dict()))


@csrf_exempt
@check_post_method
def remove_contact(request):
    try:
        contact_id = request.POST['id']
        contact = ContactsModel.objects.get(id=contact_id)
        contact.delete()
        response = SuccessResponse()
    except ObjectDoesNotExist as error:
        response = SuccessResponse(str(error))
    except Exception as error:
        response = ErrorResponse(str(error))
    return HttpResponse(json.dumps(response.as_dict()))


@csrf_exempt
@check_post_method
def create_contact(request):
    try:
        params = request.POST.dict()
        birthday = datetime.strptime(params['birthday'], ContactsModel.date_format)
        contact = ContactsModel(first_name=params['first_name'],
                                middle_name=params['middle_name'],
                                last_name=params['last_name'],
                                email=params['email'],
                                phone=params['phone'],
                                birthday=birthday)
        contact.save()
        response = SuccessResponse()
    except Exception as error:
        response = ErrorResponse(str(error))
    return HttpResponse(json.dumps(response.as_dict()))


@csrf_exempt
@check_post_method
def edit_contact(request):
    try:
        params = request.POST.dict()
        birthday = datetime.strptime(params['birthday'], ContactsModel.date_format)
        ContactsModel.objects.filter(id=params['id']).update(
            first_name=params['first_name'],
            middle_name=params['middle_name'],
            last_name=params['last_name'],
            email=params['email'],
            phone=params['phone'],
            birthday=birthday
        )
        response = SuccessResponse()
    except Exception as error:
        response = ErrorResponse(str(error))
    return HttpResponse(json.dumps(response.as_dict()))
