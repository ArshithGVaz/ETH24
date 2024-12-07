import axios from "axios";
import FormData from "form-data";

export class Akave {
  /**
   * @param {string} baseUrl
   */
  constructor(baseUrl) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * @param {string} bucketName
   * @returns {Promise<{ID: string, CreatedAt: string, transactionHash: string}>}
   */
  async createBucket(bucketName) {
    const response = (await this.client.post("/buckets", { bucketName })).data;
    return response.data;
  }

  /**
   * @returns {Promise<Array<{ID: string, CreatedAt: string, transactionHash: string}>>}
   */
  async listBuckets() {
    const response = (await this.client.get("/buckets")).data;
    return response.data;
  }

  /**
   * @param {string} bucket
   * @returns {Promise<Array<{Name: string, RootCID: string, Size: string, CreatedAt: string}>>}
   */
  async listFiles(bucket) {
    const response = (await this.client.get(`/buckets/${bucket}/files`)).data;
    return response.data;
  }

  /**
   * @param {string} bucket
   * @param {string} file
   * @returns {Promise<{Name: string, RootCID: string, Size: string, CreatedAt: string}>}
   */
  async getFileInfo(bucket, file) {
    const response = (await this.client.get(`/buckets/${bucket}/files/${file}`)).data;
    return response.data;
  }

  /**
   * @param {string} bucket
   * @param {fs.ReadStream} file
   * @returns {Promise<{Name: string, RootCID: string}>}
   */
  async uploadFile(bucket, file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = (
      await this.client.post(`/buckets/${bucket}/files`, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      })
    ).data;

    return response.data;
  }

  /**
   * @param {string} bucket
   * @param {string} fileName
   * @returns {Promise<Blob>}
   */
  async downloadFile(bucket, fileName) {
    const response = await this.client.get(`/buckets/${bucket}/files/${fileName}/download`, {
      responseType: "blob",
    });

    return response.data;
  }

  /**
   * @param {string} bucket
   * @param {string} fileName
   * @returns {string}
   */
  async getFileURL(bucket, fileName) {
    return `/buckets/${bucket}/files/${fileName}/download`;
  }
}

/**
 * @returns {Akave}
 */
export function createAkaveInstance() {
  const baseUrl = process.env.AKAVE_URL;

  if (!baseUrl) throw new Error("Base URL is not defined in the environment variables");

  return new Akave(baseUrl);
}

const akave = createAkaveInstance();

export default akave;
