pipeline {
  agent {
    node {
      label 'jenkins_build'
    }
  }
   options {
    timeout(time: 1, unit: 'HOURS')
    disableConcurrentBuilds()
    buildDiscarder(logRotator(daysToKeepStr: '30', numToKeepStr: '10', artifactDaysToKeepStr: '30', artifactNumToKeepStr: '10'))
    timestamps()
  }

  stages {
    stage('React Test') {
      agent {
        docker {
          image 'node:8.11.1'
          label 'jenkins_build'
          args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
      }
      steps {
        // Send Job Start Notification to Slack Channel.
        slackSend (color: '#FFFF00', message: "STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        sh 'npm set strict-ssl false'
        sh 'npm install'
        sh 'npm --max_old_space_size=8000 test'
      }
      post {
        always {
            junit 'junit.xml'
        }
      }
    }
  }
    stage('React Build') {
      parallel {
        stage('React Build/Push PIBS') {
          steps {
            sh 'docker build -t docker.viosystems.com:8443/nodegui:${BUILD_NUMBER} .'
            sh 'docker login  docker.viosystems.com:8443 -u ${GITHUB_ASH_CREDS_USR} -p ${GITHUB_ASH_CREDS_PSW}'
            sh 'docker push   docker.viosystems.com:8443/nodegui:${BUILD_NUMBER}'
          }
        }
      }
    }
  }
  environment {
    GITHUB_ASH_CREDS  = credentials('jenkins-user-for-nexus-repository')
  }
}

