# .BlogApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiBlogGet**](BlogApi.md#apiBlogGet) | **GET** /api/Blog | 
[**apiBlogRecentGet**](BlogApi.md#apiBlogRecentGet) | **GET** /api/Blog/recent | 
[**apiBlogSlugGet**](BlogApi.md#apiBlogSlugGet) | **GET** /api/Blog/{slug} | 
[**apiBlogTagTagGet**](BlogApi.md#apiBlogTagTagGet) | **GET** /api/Blog/tag/{tag} | 


# **apiBlogGet**
> Array<BlogPost> apiBlogGet()


### Example


```typescript
import { createConfiguration, BlogApi } from '';

const configuration = createConfiguration();
const apiInstance = new BlogApi(configuration);

const request = {};

const data = await apiInstance.apiBlogGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<BlogPost>**

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

# **apiBlogRecentGet**
> Array<BlogPost> apiBlogRecentGet()


### Example


```typescript
import { createConfiguration, BlogApi } from '';
import type { BlogApiApiBlogRecentGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BlogApi(configuration);

const request: BlogApiApiBlogRecentGetRequest = {
  
  count: 5,
};

const data = await apiInstance.apiBlogRecentGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **count** | [**number**] |  | (optional) defaults to 5


### Return type

**Array<BlogPost>**

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

# **apiBlogSlugGet**
> BlogPost apiBlogSlugGet()


### Example


```typescript
import { createConfiguration, BlogApi } from '';
import type { BlogApiApiBlogSlugGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BlogApi(configuration);

const request: BlogApiApiBlogSlugGetRequest = {
  
  slug: "slug_example",
};

const data = await apiInstance.apiBlogSlugGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | [**string**] |  | defaults to undefined


### Return type

**BlogPost**

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

# **apiBlogTagTagGet**
> Array<BlogPost> apiBlogTagTagGet()


### Example


```typescript
import { createConfiguration, BlogApi } from '';
import type { BlogApiApiBlogTagTagGetRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BlogApi(configuration);

const request: BlogApiApiBlogTagTagGetRequest = {
  
  tag: "tag_example",
};

const data = await apiInstance.apiBlogTagTagGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tag** | [**string**] |  | defaults to undefined


### Return type

**Array<BlogPost>**

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


