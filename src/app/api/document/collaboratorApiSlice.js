import { documentsApiRoute } from "../../../constants/appConstant";
import { apiSlice } from "../apiSlice";

const collaboratorApiSLice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCollaborators: builder.mutation({
            query: ({ id }) => ({
                url: documentsApiRoute + '/getCollaborators/' + encodeURI(id),
                method: 'GET',
            })
        }),
        getCollaboratorsOptions: builder.mutation({
            query: ({ id }) => ({
                url: `${documentsApiRoute}/getCollaboratorsOptions/${encodeURI(id)}`,
                method: 'GET',
            })
        }),
        addCollaborators: builder.mutation({
            query: ({ collaborators, id }) => ({
                url: `${documentsApiRoute}/addCollaborators/${encodeURI(id)}`,
                body: ({ collaborators }),
                method: 'PATCH',
            })
        }),
        removeCollaborator: builder.mutation({
            query: ({ id, removeId }) => ({
                url: `${documentsApiRoute}/removeCollaborator/${encodeURI(id)}/${encodeURI(removeId)}`,
                method: 'PATCH'
            })
        })

    })
})

export const {
    useAddCollaboratorsMutation,
    useGetCollaboratorsMutation,
    useGetCollaboratorsOptionsMutation,
    useRemoveCollaboratorMutation
} = collaboratorApiSLice