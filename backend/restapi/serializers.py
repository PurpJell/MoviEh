from rest_framework import serializers
from django.contrib.auth.models import User
from .data_models import UserProfile, Movie


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

    personalize = serializers.BooleanField(required=False)

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

        if 'personalize' in data:
            if not isinstance(data['personalize'], bool):
                raise serializers.ValidationError("Personalize must be a boolean value.")

        return data


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ['user', 'preferences']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        user.set_password(user_data['password'])
        user.save()
        user_profile = UserProfile.objects.create(user=user, **validated_data)
        return user_profile

    def update(self, instance, validated_data):
        if 'user' in validated_data:

            user_data = validated_data.pop('user')  # Remove the user data from the validated data
            user = instance.user

            if 'username' in user_data:
                user.username = user_data['username']
            if 'password' in user_data:
                user.set_password(user_data['password'])
            user.save()

        instance.save()

        return instance


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class FeedbackSerializer(serializers.Serializer):
    movie_title = serializers.CharField(max_length=255)
    feedback_polarity = serializers.BooleanField()


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'genres', 'year', 'rating', 'duration', 'shortDescription']


class UnlikeMovieSerializer(serializers.Serializer):
    movie_title = serializers.CharField(max_length=255)
