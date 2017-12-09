from django.conf.urls import url

from .views import index, all_contacts, remove_contact, create_contact, contact, edit_contact

urlpatterns = [
    url(r'^index/', index),
    url(r'^all_contacts/', all_contacts),
    url(r'^contact/(?P<contact_id>[0-9]+)/', contact),
    url(r'^remove_contact/', remove_contact),
    url(r'^create_contact/', create_contact),
    url(r'edit_contact/', edit_contact)
]