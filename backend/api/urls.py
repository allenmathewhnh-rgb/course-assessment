from django.urls import path
from .views import ModuleListAPIView

urlpatterns = [
    path("modules/", ModuleListAPIView.as_view(), name="module-list"),
]