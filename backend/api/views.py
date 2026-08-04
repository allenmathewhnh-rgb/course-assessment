from django.shortcuts import render
from rest_framework import generics
from .models import Module
from .serializers import ModuleSerializer
# Create your views here.
class ModuleListAPIView(generics.ListAPIView):
    queryset = Module.objects.all().order_by("display_order")
    serializer_class = ModuleSerializer
