from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .utils.getHomePageInfo import getListOfUnivs, getListOfMajors

def test_api(request):
    data = {'message': 'Hello from Django!'}
    return JsonResponse(data)

def get_univs_by_id(request, ccc_id):
    try:
        data = getListOfUnivs(ccc_id)
        return JsonResponse({'status': 'success', 'data': data})
    except:
        return JsonResponse({'status': 'error', 'message': 'Data not found'}, status=404)

def get_majors_by_id(request, ccc_id, univ_id):
    try:
        data = getListOfMajors(ccc_id, univ_id)
        return JsonResponse({'status': 'success', 'data': data})
    except:
        return JsonResponse({'status': 'error', 'message': 'Data not found'}, status=404)
