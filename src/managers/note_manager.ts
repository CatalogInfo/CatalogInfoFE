import Note from '@/models/note'
import { useRepo } from 'pinia-orm'
import store from '../store/store'

export type NoteType = {
  id: string,
  note: string,
  topOffset: string,
}

export default class NoteManager {
    protected static get repository() {
      return useRepo(Note, store)
    }
  
    static all() {
      return this.repository.withAllRecursive().all()
    }

    static getNoteById(id: string): Note | null {
        return this.repository.find(id)
    }

    static saveNote(note: NoteType) {
        this.repository.save(note);
    }
}  