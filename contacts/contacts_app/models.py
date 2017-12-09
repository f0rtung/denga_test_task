from django.db import models
from django.core.validators import RegexValidator


class ContactsModel(models.Model):
    date_format = "%d.%m.%Y"
    phone_regex = RegexValidator(regex=r'^\+7\(\d{3}\)(\d{3})(-\d{2}){2}$')
    name_regex = RegexValidator(regex=r'^[a-zA-Z]+$')

    first_name = models.CharField(max_length=40, validators=[name_regex])
    middle_name = models.CharField(max_length=40, validators=[name_regex])
    last_name = models.CharField(max_length=40, validators=[name_regex])
    email = models.EmailField(unique=True)
    phone = models.CharField(validators=[phone_regex], max_length=16, unique=True)
    birthday = models.DateField(null=False)

    class Meta:
        unique_together = (("first_name", "middle_name", "last_name"),)
        db_table = 'Contacts'
        verbose_name = 'Contact'
        verbose_name_plural = 'Contacts'

    def __str__(self):
        return "{} {} {} {} {} {}".format(self.first_name,
                                          self.middle_name,
                                          self.last_name,
                                          self.email,
                                          self.phone,
                                          self.birthday)

    def get_birthday(self):
        return self.birthday.strftime(self.date_format)
