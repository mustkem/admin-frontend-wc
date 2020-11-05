import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';
import { getToken } from './LocalStorage';
import { MIX_FETCH_URL } from '../config';
import httpInstance from './httpClient';

// const baseUrl = `${process.env.MIX_FETCH_URL}api/v1/`;
const baseUrl = `${MIX_FETCH_URL}api/`

const GET = 'GET';
const DELETE = 'DELETE';
const POST = 'POST';
const PUT = 'PUT';
const PATCH = 'PATCH';


export /**
 *
 *
 * @param {*} type
 * @param {*} url
 * @param {*} data
 * @param {boolean} [authToken=true]
 * @param {boolean} [fetchBaseResponse=false]
 * @param {*} contentType
 * @param {*} shouldRefetch
 * @returns
 */
    const fetchUrl = (
        type, url, data, authToken = true, fetchBaseResponse = false, contentType, shouldRefetch,
    ) => {
        setHeaders(contentType, authToken);
        if (!shouldRefetch) {
            if (type.toUpperCase() === 'GET') {
                if (cache.indexOf(url) !== -1) {
                    const controller = cancel.filter((i) => i.url === url);
                    controller.map((item) => item.c());
                } else {
                    cache.push(url);
                }
            }
        }
        const handler = ACTION_HANDLERS[type.toUpperCase()];
        return (!fetchBaseResponse ? handler(url, data)
            .then((res) => Promise.resolve(res.data))
            .catch((error) => showErrorAsToast(error, type))
            : handler(url, data)
                .catch((error) => showErrorAsToast(error, type))
        );
    };

let cache = [];
const cancel = [];
const ACTION_HANDLERS = {
    /**
     *
     *
     * @param {*} url
     * @param {*} data
     * @returns
     */
    [GET]: (url, data) => {
        let queryUrl = url;
        if (data !== undefined) {
            const query = qs.stringify(data);
            queryUrl = `${queryUrl}?${query}`;
        }
        return httpInstance.get(baseUrl + queryUrl, {
            cancelToken: new axios.CancelToken(((c) => {
                cancel.push({ url, c });
            })),
        });
    },
    /**
     *
     *
     * @param {*} url
     * @param {*} data
     */
    [DELETE]: (url, data) => axios.delete(baseUrl + url, { data }),
    /**
     *
     *
     * @param {*} url
     * @param {*} data
     */
    [POST]: (url, data) => axios.post(baseUrl + url, data),
    /**
     *
     *
     * @param {*} url
     * @param {*} data
     */
    [PUT]: (url, data) => axios.put(baseUrl + url, data),
    /**
     *
     *
     * @param {*} url
     * @param {*} data
     */
    [PATCH]: (url, data) => axios.patch(baseUrl + url, data),
};


export /**
 *
 *
 * @param {*} contentType
 * @param {*} authToken
 */
    const setHeaders = (contentType, authToken) => {
        // set auth token

        if (authToken) {
            const token = getToken();
            if (token) {
                axios.defaults.headers.common.Authorization = `Token ${token}`;
            } else {
                delete axios.defaults.headers.common.Authorization;
            }
        }

        // set contentType
        if (contentType) {
            axios.defaults.headers.post['Content-Type'] = contentType;
            axios.defaults.headers.post.Accept = 'application/json';
        } else {
            delete axios.defaults.headers.post['Content-Type'];
        }
    };

export /**
 *
 *
 * @param {*} error
 * @param {*} type
 * @returns
 */
    const showErrorAsToast = (error, type) => {
        if (error.response && Object.prototype.hasOwnProperty.call(error.response, 'data')) {
            const value = error.response.data;
            if (Object.prototype.hasOwnProperty.call(value, 'detail')) {
                message.error(value.detail);
            }
            if (value.message !== undefined) {
                if (typeof value.message === 'string') {
                    message.error(value.message);
                }
            }
            message.error('Something went wrong, Please do try again !');
        } else if (type.toUpperCase() !== 'GET') {
            message.error('Something went wrong, Please do try again !');
        }
        /* if (error.response.status === 401) {
          LocalStorage.clean();
          window.location.href = routes.login;
        } */
        if (error.response && error.response.status === 404) {
            // LocalStorage.clean();
            //window.location.href = routes.page404;
        }
        cache = [];
        return Promise.reject(error.response && error.response.data);
    };


