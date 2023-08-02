<template>
  <main>
    <div class="wrapper">
      <Form store="store" />
      <!--      <DocumentUploader-->
      <!--        ref="documentUploader"-->
      <!--        v-model="filesModel"-->
      <!--        qa="vue3"-->
      <!--        class="m-b:16 desktop(m-b:0)"-->
      <!--        :label="labelling"-->
      <!--        :show-guide="showGuide"-->
      <!--        :show-tool-tip="showToolTip"-->
      <!--        :guide-header="headerGuide"-->
      <!--        :guide-text="textGuide"-->
      <!--        :guide-images="imageGuide"-->
      <!--        :options="uploadOption"-->
      <!--        :input-state="inputState"-->
      <!--        :message-text="messageText"-->
      <!--        :error-message-text="errorMessageText"-->
      <!--        :guide-local-storage-key="guide"-->
      <!--      />-->
    </div>
  </main>

  <div id="overlay" class="portal" />
</template>
<script lang="ts" setup>
import Form from './Form'

const documentData = {
  responseRequestIdentity: false,
  sessionRequestIdentity: false,
  test: 'test',
  head: 'header',
  text: 'text',
  filesModel: [],
  inputState: 'inputstets',
  images: [
    {
      url: 'image.png',
      description: 'png'
    },
    {
      url: 'image.jpg',
      description: 'jpg'
    }
  ],
  guide: 'false',
  showGuide: true,
  showToolTip: false,
  labelling: 'The Label',
  errorMessageText: 'Error Message Text',
  messageText: 'Message Text',
  headerGuide: 'Header Guide',
  textGuide: 'Text Guide',
  imageCarousel: [
    {
      id: '1',
      type: 'image/jpg'
    },
    {
      id: '2',
      type: 'image/png'
    }
  ],
  imageGuide: [
    {
      url: '',
      description: 'advisory1'
    },
    {
      url: '',
      description: 'advisory2'
    },
    {
      url: '',
      description: 'advisory3'
    },
    {
      url: '',
      description: 'advisory4'
    }
  ],
  uploadOption: {
    params: {
      docType: 'travel_document',
      link: true,
      employingUen: '197600722D',
      employingBr: '000',
      employingDiv: '00',
      fin: 'F7710226N'
    }
  }
}
const {
  responseRequestIdentity,
  sessionRequestIdentity,
  test,
  head,
  text,
  filesModel,
  inputState,
  images,
  guide,
  showGuide,
  showToolTip,
  labelling,
  errorMessageText,
  messageText,
  headerGuide,
  textGuide,
  imageCarousel,
  imageGuide,
  uploadOption
} = documentData
</script>

<style>
.wrapper, .wrapper > div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 7px 14px;
}

.wrapper * {
  margin: auto;
}
</style>
