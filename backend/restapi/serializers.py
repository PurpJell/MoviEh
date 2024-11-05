from rest_framework import serializers


class QuestionnaireResultSerializer(serializers.Serializer):
    phrases = serializers.ListField(child=serializers.CharField(max_length=255))
    tags = serializers.ListField(child=serializers.CharField(max_length=255))
