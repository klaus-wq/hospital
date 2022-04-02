from django.contrib.auth.models import User
from django.db import models
import datetime


class Doctor(User):

    class Meta:
        verbose_name = "doctor"

    def __str__(self):
        return self.first_name + ' ' + self.last_name


class Patient(User):
    age = models.PositiveSmallIntegerField('age')

    class Meta:
        verbose_name = "patient"

    def __str__(self):
        return self.first_name + ' ' + self.last_name


class Note(models.Model):
    doctor = models.ForeignKey(Doctor, null=True, on_delete=models.SET_NULL)
    patient = models.ForeignKey(Patient, null=True, on_delete=models.SET_NULL)
    description = models.TextField('description', max_length=1000)
    active = models.BooleanField('active', default=True)


class Audit(models.Model):
    table = models.CharField('table', max_length=100)
    action = models.CharField('action', max_length=100)
    user = models.CharField('user', max_length=100)
    description = models.TextField('description', max_length=500)

class Timetable(models.Model):
    doctor = models.ForeignKey(Doctor, null=True, on_delete=models.SET_NULL)
    # date = models.DateField(null=True, default='2021-11-27 20:00:00')
    monday = models.CharField(null=True, default='Выходной', max_length=19)
    thursday = models.CharField(null=True, default='Выходной', max_length=19)
    wednesday = models.CharField(null=True, default='Выходной', max_length=19)
    tuesday = models.CharField(null=True, default='Выходной', max_length=19)
    friday = models.CharField(null=True, default='Выходной', max_length=19)
    saturday = models.CharField(null=True, default='Выходной', max_length=19)
    sunday = models.CharField(null=True, default='Выходной', max_length=19)
    # start = models.TimeField(null=True)
    # end = models.TimeField(null=True)
