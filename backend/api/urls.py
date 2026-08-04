from django.urls import path
from .views import ModuleListAPIView, FeedbackCreateAPIView

urlpatterns = [
    path("modules/", ModuleListAPIView.as_view(), name="module-list"),
    path("modules/<int:pk>/feedback/", FeedbackCreateAPIView.as_view(), name="feedback-create"),
]