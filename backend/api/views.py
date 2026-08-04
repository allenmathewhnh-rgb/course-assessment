from rest_framework import generics, status
from rest_framework.response import Response
from .models import Module
from .serializers import ModuleSerializer, FeedbackSerializer


class ModuleListAPIView(generics.ListAPIView):
    queryset = Module.objects.all().order_by("display_order")
    serializer_class = ModuleSerializer


class FeedbackCreateAPIView(generics.CreateAPIView):
    serializer_class = FeedbackSerializer

    def post(self, request, pk):
        module = Module.objects.get(pk=pk)

        serializer = FeedbackSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(module=module)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)