# .ContactApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiContactHealthGet**](ContactApi.md#apiContactHealthGet) | **GET** /api/Contact/health | 
[**apiContactPost**](ContactApi.md#apiContactPost) | **POST** /api/Contact | 


# **apiContactHealthGet**
> void apiContactHealthGet()


### Example


```typescript
import { createConfiguration, ContactApi } from '';

const configuration = createConfiguration();
const apiInstance = new ContactApi(configuration);

const request = {};

const data = await apiInstance.apiContactHealthGet(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **apiContactPost**
> ContactResponse apiContactPost()


### Example


```typescript
import { createConfiguration, ContactApi } from '';
import type { ContactApiApiContactPostRequest } from '';

const configuration = createConfiguration();
const apiInstance = new ContactApi(configuration);

const request: ContactApiApiContactPostRequest = {
  
  contactMessage: {
    name: "name_example",
    email: "email_example",
    subject: "subject_example",
    message: "message_example",
    createdAt: new Date('1970-01-01T00:00:00.00Z'),
  },
};

const data = await apiInstance.apiContactPost(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **contactMessage** | **ContactMessage**|  |


### Return type

**ContactResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


