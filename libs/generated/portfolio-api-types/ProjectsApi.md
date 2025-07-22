# .ProjectsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiProjectsFeaturedGet**](ProjectsApi.md#apiProjectsFeaturedGet) | **GET** /api/Projects/featured | 
[**apiProjectsGet**](ProjectsApi.md#apiProjectsGet) | **GET** /api/Projects | 
[**apiProjectsIdGet**](ProjectsApi.md#apiProjectsIdGet) | **GET** /api/Projects/{id} | 


# **apiProjectsFeaturedGet**
> Array<ProjectInfo> apiProjectsFeaturedGet()


### Example


```typescript
import { createConfiguration, ProjectsApi } from '';

const configuration = createConfiguration();
const apiInstance = new ProjectsApi(configuration);

const request = {};

const data = await apiInstance.apiProjectsFeaturedGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<ProjectInfo>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **apiProjectsGet**
> Array<ProjectInfo> apiProjectsGet()


### Example


```typescript
import { createConfiguration, ProjectsApi } from '';

const configuration = createConfiguration();
const apiInstance = new ProjectsApi(configuration);

const request = {};

const data = await apiInstance.apiProjectsGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<ProjectInfo>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **apiProjectsIdGet**
> ProjectInfo apiProjectsIdGet()


### Example


```typescript
import { createConfiguration, ProjectsApi } from '';
import type { ProjectsApiApiProjectsIdGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new ProjectsApi(configuration);

const request: ProjectsApiApiProjectsIdGetRequest = {
  
  id: 1,
};

const data = await apiInstance.apiProjectsIdGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] |  | defaults to undefined


### Return type

**ProjectInfo**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


