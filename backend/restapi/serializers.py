from rest_framework import serializers


class OptionSerializer(serializers.Serializer):
    text = serializers.CharField(max_length=255)
    result = serializers.ListField(child=serializers.CharField(max_length=255))


class QuestionSerializer(serializers.Serializer):
    question = serializers.CharField(max_length=255)
    type = serializers.ChoiceField(choices=["radio", "checkbox"])
    resultType = serializers.ChoiceField(choices=["phrase", "tags"])
    options = OptionSerializer(many=True)


class QuestionnaireResultsSerializer(serializers.Serializer):
    phrases = serializers.ListField(child=serializers.CharField(max_length=255))  # noqa: E501
    tags = serializers.ListField(child=serializers.CharField(max_length=255))
