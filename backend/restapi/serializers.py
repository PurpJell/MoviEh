from rest_framework import serializers


class OptionSerializer(serializers.Serializer):
    text = serializers.CharField(max_length=255)
    result = serializers.ListField(child=serializers.CharField(max_length=255))


class QuestionSerializer(serializers.Serializer):
    text = serializers.CharField(max_length=255)
    type = serializers.ChoiceField(choices=["radio", "checkbox"])
    resultType = serializers.ChoiceField(choices=["phrase", "tags"])
    options = OptionSerializer(many=True)


class QuestionnaireSerializer(serializers.Serializer):
    questions = QuestionSerializer(many=True)


class TagListSerializer(serializers.Serializer):
    tags = serializers.ListField(child=serializers.CharField(max_length=255))


class CombinedInputSerializer(serializers.Serializer):
    phrases = serializers.ListField(
        child=serializers.CharField(max_length=255),
        required=False
    )
    tags = serializers.ListField(
        child=serializers.CharField(max_length=50),
        required=False
    )
    user_input = serializers.CharField(max_length=500, required=False)

    def validate(self, data):
        if 'phrases' in data and 'tags' in data:
            if 'user_input' in data:
                raise serializers.ValidationError("Cannot provide both questionnaire and user input data.")  # noqa: E501
            if not data['phrases'] or not data['tags']:
                raise serializers.ValidationError("Both phrases and tags must be provided for questionnaire data.")  # noqa: E501
        elif 'user_input' in data:
            if 'phrases' in data or 'tags' in data:
                raise serializers.ValidationError("Cannot provide both questionnaire and user input data.")  # noqa: E501
        else:
            raise serializers.ValidationError("Must provide either questionnaire data (phrases and tags) or user input data.")  # noqa: E501
        return data
