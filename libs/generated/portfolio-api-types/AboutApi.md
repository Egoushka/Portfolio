# .AboutApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiAboutGet**](AboutApi.md#apiAboutGet) | **GET** /api/About | 


# **apiAboutGet**
> AboutMe apiAboutGet()


### Example


```typescript
import { createConfiguration, AboutApi } from '';

const configuration = createConfiguration();
const apiInstance = new AboutApi(configuration);

const request = {};

const data = await apiInstance.apiAboutGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**AboutMe**

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


