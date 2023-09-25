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
        }),
        getAllDocuments: builder.mutation({
            query: ({ title }) => {
                let query = ''
                if (title) query += `?title=${title}`;
                return {
                    url: `${documentsApiRoute}/getAllDocuments${query}`,
                    method: 'GET'
                }
            }
        })

    })
})

export const {
    useRenameMutation,
    useViewAccessMutation,
    useEditAccessMutation,
    useGetAllDocumentsMutation } =
    documentApiSlice