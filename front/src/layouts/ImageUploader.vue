<script setup>
import { ref, watch } from "vue";
import { saveFile } from "../services/UploadFileService";
const emit = defineEmits(["showToast"]);
const fileUploaded = ref(null);
const isUploading = ref(false);
const img = ref(null);

const chooseFile = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/jpeg, image/png";
  input.onchange = (event) => {
    fileUploaded.value = event.target.files[0];
  };
  input.click();
  input.remove();
};

const dragFile = (event) => {
  if (event.dataTransfer.files.length) {
    fileUploaded.value = event.dataTransfer.files[0];
  }
};

const uploadFile = async () => {
  isUploading.value = true;
  const url = await saveFile(fileUploaded.value);
  img.value = url;
  isUploading.value = false;
};

const copyLink = () => {
  emit("showToast");
  navigator.clipboard.writeText(img.value);
};

const resetFile = () => {
  img.value = null;
};

watch(fileUploaded, async (newFile) => {
  await uploadFile();
});
</script>
<template>
  <div
    v-if="!isUploading && !img"
    class="container flex align-center column justify-center"
  >
    <h3>Upload your image</h3>
    <p class="files-allowed">File should be Jpeg, Png,...</p>

    <div
      @dragover.prevent
      @drop.prevent="dragFile"
      @click="chooseFile()"
      class="flex column align-center box-drop pointer"
    >
      <img src="../assets/image.svg" alt="image" />
      <p class="text-drop">Drag & Drop your image here</p>
    </div>

    <p class="or">Or</p>

    <button type="button" @click="chooseFile()">Choose a file</button>
  </div>
  <div
    v-else-if="isUploading && !img"
    class="container flex column justify-center"
  >
    <h3>Uploading...</h3>
    <div class="upload-bar">
      <div class="upload-progress"></div>
    </div>
  </div>
  <div
    v-else-if="!isUploading && img"
    class="container flex column justify-center align-center"
  >
    <div class="circle-green flex justify-center align-center">
      <span class="material-icons">done</span>
    </div>
    <h3 class="margin-upload-successfully">Uploaded Successfully!</h3>
    <img class="img-uploaded" :src="img" alt="image" />
    <div class="flex align-center box-img-url full">
      <p>{{ img }}</p>
      <button class="ml-15" type="button" @click="copyLink()">Copy link</button>
    </div>
    <a class="reset-button pointer" @click="resetFile">
      &larr; Upload new file
    </a>
  </div>
</template>

<style scoped>

button {
  white-space: nowrap;
}
.reset-button {
  text-decoration: none;
  color: #2f80ed;
  margin-top: 2.5rem;
}
.ml-15 {
  margin-left: 1.5rem;
}
.box-img-url {
  background: #f6f8fb;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.2rem 0.2rem 0.2rem 0.7rem;
  margin-top: 2.5rem;
}
.box-img-url p {
  font-weight: 500;
  font-size: 0.8rem;
  letter-spacing: -0.035em;
  color: #4f4f4f;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text-drop {
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: -0.035em;
  color: #bdbdbd;
  margin-top: 3.8rem;
  white-space: nowrap;
}
.margin-upload-successfully {
  margin-top: 1.1rem;
  margin-bottom: 2.5rem;
}
button {
  background: #2f80ed;
  border-radius: 8px;
  padding: 0.8rem 1.6rem;
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: -0.035em;
  color: #ffffff;
  border: none;
  cursor: pointer;
}
.or {
  font-weight: 500;
  font-size: 1.2rem;
  letter-spacing: -0.035em;
  color: #bdbdbd;
  margin-top: 1.9rem;
  margin-bottom: 3rem;
}
.container {
  padding: 3.2rem 3.6rem;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  width: 40rem;
}
h3 {
  font-weight: 500;
  font-size: 1.8rem;
  letter-spacing: -0.035em;
  color: #4f4f4f;
}
.files-allowed {
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: -0.035em;
  color: #828282;
  margin-top: 1.6rem;
  margin-bottom: 3rem;
}

.box-drop {
  max-width: 100%;
  padding: 3.6rem 8rem 4rem 9rem;
  background: #f6f8fb;
  border: 1px dashed #97bef4;
  border-radius: 12px;
}

.upload-bar {
  height: 0.6rem;
  border-radius: 8px;
  margin-top: 3rem;
  background-color: #f2f2f2;
  overflow: hidden;
  position: relative;
}

.upload-progress {
  width: 10rem;
  height: 100%;
  background-color: #2f80ed;
  border-radius: 8px;
  animation: progress-animation 2s ease-in-out infinite;
  transform: translateX(-100%);
  position: absolute;
}

.circle-green {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: #219653;
}
.material-icons {
  color: #fff;
}

.img-uploaded {
  width: 100% !important;
  border-radius: 12px;
  max-height: 22.5rem;
}

@keyframes progress-animation {
  0% {
    left: 0;
  }
  100% {
    left: calc(100% + 10rem);
  }
}

@media screen and (max-width: 576px) {
  .container {
    width: 100% !important;
    padding: 1.6rem 1.8rem;
  }
  .box-drop {
    padding: 1.8rem 4rem 2rem 4.5rem;
  }
}
</style>
