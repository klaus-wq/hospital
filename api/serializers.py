from abc import ABC

from rest_framework import serializers
from api.models import Note, Doctor, Patient, Timetable


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ('first_name', 'last_name',)


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('first_name', 'last_name',)


class NoteSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer()
    patient = PatientSerializer()

    class Meta:
        model = Note
        fields = ('doctor', 'patient', 'description', 'id')

class TimetableSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer()

    class Meta:
        model = Timetable
        fields = ('doctor', 'monday', 'thursday', 'wednesday', 'tuesday', 'friday', 'saturday', 'sunday')


class CreateNoteSerializer(serializers.Serializer):
    class Meta:
        fields = ('doctor_name', 'doctor_fam', 'patient_name', 'patient_fam', 'description')
