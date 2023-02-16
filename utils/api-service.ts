// API call functions, authentication functions are defined here

import {useCallback, useEffect, useState} from 'react';
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { BASE_URL } from './constants';

const getAuthToken = () => {
    if (localStorage.getItem("signUpInfoStorage")) {
        const signUpInfoStorageData = JSON.parse(localStorage.getItem("signUpInfoStorage") as string);
        if (signUpInfoStorageData?.token) {
            return signUpInfoStorageData?.token;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

const hasSession = () => {
  if(localStorage.getItem("User")) {
    return JSON.parse(localStorage.getItem("User") as string)?.client_session_key;
  }
}


const generateHeaders = (customHeader?: Record<string, any>) => {
    return {
        ...customHeader,
        ...getAuthToken() && {"authorization": `Bearer ${getAuthToken()}`},
        // ...hasSession() && {"session-key": `${hasSession()}`},
    };
};


export const useFetch = () => {
    const [fetchInfo, setFetchInfo] = useState<Record<string, any>>({
        data: null,
        isLoading: false,
        error: null,
    });

    const getData = useCallback(
        async (
            query: string,
            data?: Record<string, any>,
            customHeader?: Record<string, any> | null | undefined
        ) => {
            setFetchInfo((prevState) => {
                return { ...prevState, isLoading: true };
            });

            try {
                let response = await axios({
                    method: "GET",
                    url: `${BASE_URL}${query}`,
                    data: data,
                    headers: customHeader
                        ? generateHeaders(customHeader)
                        : generateHeaders(),
                });
                if (response) {
                    setFetchInfo((prevState) => {
                        return {
                            ...prevState,
                            data: response,
                            isLoading: false,
                            error: null,
                        };
                    });
                    return response;
                }
            } catch (error) {
                if (error) {
                    setFetchInfo((prevState) => {
                        return { ...prevState, isLoading: false, error: error };
                    });
                }
            }
        },
        []
    );

    return [fetchInfo, getData] as const;
};

export const usePost = () => {
  const [postInfo, setPostInfo] = useState<Record<string, any>>({
      data: null,
      isLoading: false,
      error: null,
  });

  const postData = useCallback(async (query: string, data?: Record<string, any>, customHeader?: Record<string, any> | null | undefined) => {
      setPostInfo((prevState) => {
          return { ...prevState, isLoading: true };
      });

      try {
          let response = await axios({
              method: "POST",
              url: `${BASE_URL}${query}`,
              data: data,
              headers: customHeader ? generateHeaders(customHeader) : generateHeaders(),
          });
          if (response) {
              setPostInfo((prevState) => {
                  return { ...prevState, data: response, isLoading: false, error: null };
              });
              return response;
          }
      } catch (error) {
          if (error) {
              setPostInfo((prevState) => {
                  return { ...prevState, isLoading: false, error: error };
              });
          }
      }
  }, []);

  return [postInfo, postData] as const;
};
