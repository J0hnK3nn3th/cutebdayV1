from django.urls import include, path


urlpatterns = [
    path("", include("birthday.urls")),
]
