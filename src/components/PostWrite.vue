<template>
  <h2>글쓰기</h2>
  <div class="mt-2">
    <input type="text" v-model="title" class="form-control" id="title" placeholder="제목">
    <br/>
    <div class="editor" v-if="editor">
      <menu-bar className="editor__header" :editor="editor"/>
      <editor-content className="editor__content" :editor="editor"/>
    </div>
    <br/>
    <button @click="write" class="btn btn-primary me-2" disabled="disabled">글쓰기</button>
    <button class="btn btn-outline-dark m-lg-2" @click="moveToPostListPage">취소</button>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import useAxios from '@/modules/axios'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import MenuBar from '@compo/tiptap/MenuBar'
import router from '@/router'

export default {
  components: {
    EditorContent,
    MenuBar,
  },

  setup() {
    const store = useStore()
    const { axiosPost } = useAxios()

    const needLogin = computed(() => {
      return store.getters['needLogin']
    })

    onBeforeMount(() => {
      if (!needLogin.value) {
        alert('로그인이 필요합니다!')
        router.push('/boards')
      }
    })

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

    const write = () => {
      // console.log('제목: ' + title.value)
      // console.log('내용: ' + editor.value.getHTML())
      axiosPost('/api/v1/boards/1/posts', {
        title: title.value,
        content: editor.value.getHTML()
      }, onSuccess, onFailed)
    }

    const onSuccess = () => {

    }

    const onFailed = () => {

    }

    const moveToPostListPage = () => {
      router.go(-1)
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