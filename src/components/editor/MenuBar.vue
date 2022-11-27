<template>
  <div>
    <Modal ref="modal" @onConfirm="addImage"/>
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`"/>
      <MenuItem v-else :key="index" v-bind="item"/>
    </template>
  </div>
</template>

<script>
import { ref } from 'vue'
import MenuItem from '@compo/editor/MenuItem.vue'
import Modal from '@compo/editor/Modal.vue'

export default {
  components: {
    MenuItem,
    Modal,
  },

  props: {
    editor: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const modal = ref(null)
    const items = [
      {
        icon: 'type-bold',
        title: '굵기 적용',
        action: () => props.editor.chain().focus().toggleBold().run(),
        isActive: () => props.editor.isActive('bold'),
      },
      {
        icon: 'type-italic',
        title: '기울이기 적용',
        action: () => props.editor.chain().focus().toggleItalic().run(),
        isActive: () => props.editor.isActive('italic'),
      },
      {
        icon: 'type-strikethrough',
        title: '취소선 적용',
        action: () => props.editor.chain().focus().toggleStrike().run(),
        isActive: () => props.editor.isActive('strike'),
      },
      {
        icon: 'code',
        title: '소스코드 추가',
        action: () => props.editor.chain().focus().toggleCode().run(),
        isActive: () => props.editor.isActive('code'),
      },
      {
        icon: 'pen',
        title: '하이라이트 적용',
        action: () => props.editor.chain().focus().toggleHighlight().run(),
        isActive: () => props.editor.isActive('highlight'),
      },
      {
        type: 'divider',
      },
      {
        icon: 'type-h1',
        title: 'Heading 1',
        action: () => props.editor.chain().focus().toggleHeading({level: 1}).run(),
        isActive: () => props.editor.isActive('heading', {level: 1}),
      },
      {
        icon: 'type-h2',
        title: 'Heading 2',
        action: () => props.editor.chain().focus().toggleHeading({level: 2}).run(),
        isActive: () => props.editor.isActive('heading', {level: 2}),
      },
      {
        icon: 'paragraph',
        title: 'Paragraph',
        action: () => props.editor.chain().focus().setParagraph().run(),
        isActive: () => props.editor.isActive('paragraph'),
      },
      {
        icon: 'list-ul',
        title: '글 머리표',
        action: () => props.editor.chain().focus().toggleBulletList().run(),
        isActive: () => props.editor.isActive('bulletList'),
      },
      {
        icon: 'list-ol',
        title: '문단 번호',
        action: () => props.editor.chain().focus().toggleOrderedList().run(),
        isActive: () => props.editor.isActive('orderedList'),
      },
      {
        icon: 'list-task',
        title: 'Task List',
        action: () => props.editor.chain().focus().toggleTaskList().run(),
        isActive: () => props.editor.isActive('taskList'),
      },
      {
        icon: 'code-square',
        title: 'Code Block',
        action: () => props.editor.chain().focus().toggleCodeBlock().run(),
        isActive: () => props.editor.isActive('codeBlock'),
      },
      {
        type: 'divider',
      },
      {
        icon: 'quote',
        title: 'Blockquote',
        action: () => props.editor.chain().focus().toggleBlockquote().run(),
        isActive: () => props.editor.isActive('blockquote'),
      },
      {
        icon: 'hr',
        title: 'Horizontal Rule',
        action: () => props.editor.chain().focus().setHorizontalRule().run(),
      },
      {
        type: 'divider',
      },
      {
        icon: 'text-wrap',
        title: 'Hard Break',
        action: () => props.editor.chain().focus().setHardBreak().run(),
      },
      {
        icon: 'trash3',
        title: 'Clear Format',
        action: () => props.editor.chain().focus().clearNodes().unsetAllMarks().run(),
      },
      {
        type: 'divider',
      },
      {
        icon: 'image',
        title: 'Add Image',
        action: () => modal.value.showModal(),
      },
      {
        type: 'divider',
      },
      {
        icon: 'arrow-counterclockwise',
        title: 'Undo',
        action: () => props.editor.chain().focus().undo().run(),
      },
      {
        icon: 'arrow-clockwise',
        title: 'Redo',
        action: () => props.editor.chain().focus().redo().run(),
      },
    ]

    /**
     * Inserts an image in the editor.
     * @todo Delete see tag later
     * @param { { src: string, alt?: string, title?: string } } data src: URL string
     * @see https://codesandbox.io/s/j3p0z44155?file=/src/components/Editor.vue
     */
    const addImage = (data) => {
      props.editor.chain().focus().setImage(data).run()
    }

    return {
      modal,
      items,
      addImage,
    }
  },
}
</script>

<style lang="scss">
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(#000, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
</style>