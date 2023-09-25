import { documentsApiRoute } from "../../../constants/appConstant";
import { apiSlice } from "../apiSlice";

const viewerApiSLice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getViewers: builder.mutation({
            query: ({ id }) => ({
                url: documentsApiRoute + '/getViewers/' + encodeURI(id),
                method: 'GET',
            })
        }),
        getViewersOptions: builder.mutation({
            query: ({ id }) => ({
                url: `${documentsApiRoute}/getViewersOptions/${encodeURI(id)}`,
                method: 'GET',
            })
        }),
        addViewers: builder.mutation({
            query: ({ viewers, id }) => ({
                url: `${documentsApiRoute}/addViewers/${encodeURI(id)}`,
                body: ({ viewers }),
                method: 'PATCH',
            })
        }),
        removeViewer: builder.mutation({
            query: ({ id, removeId }) => ({
                url: `${documentsApiRoute}/removeViewer/${encodeURI(id)}/${encodeURI(removeId)}`,
                method: 'PATCH'
            })
        })

    })
})

export const {
    useAddViewersMutation,
    useGetViewersMutation,
    useGetViewersOptionsMutation,
    useRemoveViewerMutation
} = viewerApiSLice