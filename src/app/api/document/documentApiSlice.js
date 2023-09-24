import { documentsApiRoute } from "../../../constants/appConstant";
import { apiSlice } from "../apiSlice";

const documentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        rename: builder.mutation({
            query: ({ title, id }) => ({
                url: documentsApiRoute + '/rename/' + encodeURI(id),
                method: 'PATCH',
                body: { title }
            })
        }),
        viewAccess: builder.mutation({
            query: ({ isPublic, id }) => ({
                url: `${documentsApiRoute}/changeViewAccess/${encodeURI(id)}`,
                body: { isPublic },
                method: 'PATCH',
            })
        }),
        editAccess: builder.mutation({
            query: ({ isPubliclyEditable, id }) => ({
                url: `${documentsApiRoute}/changeEditAccess/${encodeURI(id)}`,
                body: { isPubliclyEditable },
                method: 'PATCH',
            })
        })

    })
})

export const { useRenameMutation, useViewAccessMutation, useEditAccessMutation } = documentApiSlice