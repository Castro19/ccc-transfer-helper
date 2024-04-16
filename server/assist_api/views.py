from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .utils.getHomePageInfo import getListOfUnivs

def test_api(request):
    data = {'message': 'Hello from Django!'}
    return JsonResponse(data)

def get_univs_by_id(request, unique_id):
    print("ID: ", unique_id)

    try:
        base_dir = "ccc_info/"
        data = getListOfUnivs(unique_id)
        return JsonResponse({'status': 'success', 'data': data})
    except:
        return JsonResponse({'status': 'error', 'message': 'Data not found'}, status=404)
