from rest_framework import serializers
from .models import Module, Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ["id", "name", "rating", "comment"]

class ModuleSerializer(serializers.ModelSerializer):
    feedbacks = FeedbackSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ["id", "title", "description", "display_order", "feedbacks"]