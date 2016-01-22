#include <nan.h>

#if _POSIX_C_SOURCE >= 200809L
#include <sys/types.h>
#include <sys/wait.h>
#else
#error "no waitpid support"
#endif

NAN_METHOD(pact_waitpid) {
	Nan::HandleScope scope;
	if (info.Length() < 1 || !info[0]->IsUint32()) {
		return Nan::ThrowError("arguments[0] not uint32_t (pid_t)");
	}
	int status, options = WNOHANG;
	pid_t pid = ::waitpid(info[0]->Uint32Value(), &status, options);
	info.GetReturnValue().Set(pid);
}

NAN_MODULE_INIT(init_natives) {
	Nan::Set(target, Nan::New<v8::String>("waitpid").ToLocalChecked(), Nan::New<v8::FunctionTemplate>(pact_waitpid)->GetFunction());
}

NODE_MODULE(pact_natives, init_natives)
