from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated

from ..serializer import PostSerializer, PictureSerializer, UserSerializer_Profile
from ..models import Post, Picture

from rest_framework.parsers import FormParser, MultiPartParser

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([FormParser, MultiPartParser])
def uploadPost(request):
    try:
        newPost = Post(belongToUser=request.user,
                       title=request.data['title'],
                       descriptions=request.data['description'],
                       category=request.data['category'])
        newPost.save()
        images = request.FILES.getlist('images')
        for image in images:
            newImage = Picture(image=image, belongToPost=newPost)
            newImage.save()
        return Response("successfully uploaded post")
    except Exception as e:
        print("something went wrong")
        print(e)
        return Response("Something went wrong")

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePost(request, post_id):
    try:
        post = Post.objects.get(pk=post_id)
        #if post doesn't belong to this user
        if(post.belongToUser != request.user):
            return Response("You can't delete a post from others")
        post.delete()
        print("delete object", post_id)
        pictures = Picture.objects.filter(belongToPost=post_id)
        print(pictures)
        count = pictures.delete()
        return Response("delete posts and related pictures successfully")
    except Exception as e:
        print("something went wrong")
        print(e)
        return Response("Something went wrong")






    


