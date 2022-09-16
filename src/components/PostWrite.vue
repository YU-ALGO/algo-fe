<template>
  <div class="container">
    <div class="card mt-4">
      <div class="card-body">
        <h5 class="card-title">새로운 글 등록</h5>
        <div class="mt-3">
          <div class="form-group">
            <label>제목</label>
            <input type="text" v-model="title" class="form-control mt-2" id="title" placeholder="글 제목을 입력해주세요." required>
          </div>
          <br/>
          <div class="form-group">
            <label>본문</label>
            <div class="editor mt-2" v-if="editor">
              <menu-bar className="editor__header" :editor="editor"/>
              <editor-content className="editor__content" :editor="editor"/>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between mt-3">
          <button class="btn btn-primary" @click="moveToPostListPage">목록으로</button>
          <button @click="write" class="btn btn-success me-2">글쓰기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import useAxios from '@/modules/axios'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import MenuBar from './tiptap/MenuBar'
import router from '@/router'
import { useRoute } from 'vue-router'

export default {
  components: {
    EditorContent,
    MenuBar,
  },

  setup() {
    const { axiosPost } = useAxios()
    const route = useRoute()
    const boardId = route.params.id
    const title = ref('')
    const editor = useEditor({
      // content: '',
      extensions: [
        StarterKit,
        Highlight,
        Image,
        TaskItem,
        TaskList,
      ],
    })

    const write = async () => {
      // console.log(boardId)
      // console.log('제목: ' + title.value)
      // console.log('내용: ' + editor.value.getHTML())
      try {
        await axiosPost(`/api/v1/boards/${boardId}/posts`, {
          title: title.value,
          content: editor.value.getHTML()
        }, onSuccess, onFailed)
      } catch (err) {
        console.log(err)
      }
    }

    const onSuccess = () => {
      alert('게시글 업로드가 완료되었습니다!')
      router.push(`/boards/${boardId}`)
    }

    const onFailed = () => {

    }

    const moveToPostListPage = () => {
      if (confirm('글 작성을 취소하시겠습니까? \n변경사항은 저장되지 않습니다.')) {
        router.push(`/boards/${boardId}`)
      }
    }

    return {
      title,
      editor,
      write,
      moveToPostListPage,
    }
  },
}
</script>

<style lang="scss">
.editor {
  display: flex;
  flex-direction: column;
  max-height: 26rem;
  color: #0D0D0D;
  background-color: #FFF;
  border: 3px solid #0D0D0D;
  border-radius: 0.75rem;

  &__header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-bottom: 3px solid #0D0D0D;
  }

  &__content {
    padding: 1.25rem 1rem;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  mark {
    background-color: #FAF594;
  }

  img {
    max-width: 100%;
    height: auto;

    &.ProseMirror-selectednode {
      outline: 3px solid #68CEF8;
    }
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}

/* delete editor focus outline */
.ProseMirror:focus {
  outline: none;
}
</style>