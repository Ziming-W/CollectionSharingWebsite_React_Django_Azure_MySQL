from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from ..serializer import PostSerializer
from ..serializer import PictureSerializer
from ..serializer import UserSerializer_Profile
from ..models import Post
from ..models import Picture

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfile(request):
    user = request.user
    serializer = UserSerializer_Profile(user)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getHistoryPost(request, post_category):
    user = request.user
    #get all post
    if(post_category == "all"):
        allUserPosts = Post.objects.filter(belongToUser = user)
        serializer = PostSerializer(allUserPosts, many=True)
        return Response(serializer.data)
    else:
        userCategoricalPosts = Post.objects.filter(belongToUser = user, category = post_category)
        serializer = PostSerializer(userCategoricalPosts, many=True)
        return Response(serializer.data)




