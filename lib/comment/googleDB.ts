import { getGenericData } from 'lib/googlesheet/googleDB'
import { IGoogleSheetDBCommentSchema } from './types'

export const getComments = async (handle?: string):Promise<IGoogleSheetDBCommentSchema[]> => {
    const data = await getGenericData<IGoogleSheetDBCommentSchema>('Comment')
    if (!handle) {
        return data
    }
    return data.filter((item) => item.Handle === handle)
}