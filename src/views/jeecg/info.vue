 <template>
  <div style="width:100%;height:100%;">
    <div id="#canvas"></div>
  </div>
</template>

<script>
import $ from 'jquery'
import { getAction } from '@/api/manage'
import BpmnViewer from 'bpmn-js'
export default {
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    initing() {
      var url = '/demo/info/hello'
      getAction(url).then(res => {
        if (res.success) {
          this.msg = res.result
        }
      })
    }
  },
  created() {
    this.initing()
    init()
  }
}

function init() {
  var viewer = new BpmnViewer({
    container: '#canvas'
  })

  viewer.importXML(pizzaDiagram, function(err) {
    if (!err) {
      console.log('success!')
      viewer.get('canvas').zoom('fit-viewport')
    } else {
      console.log('something went wrong:', err)
    }
  })
}
</script>